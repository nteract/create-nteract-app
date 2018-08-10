#!/usr/bin/env node
const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const spawn = require("cross-spawn");
const semver = require("semver");
const url = require("url");
const hyperquest = require("hyperquest");
const os = require("os");
const packageJson = require("../package.json");
const tmp = require("tmp");

let projectName;

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(name => {
    projectName = name;
  })
  .option("-l, --language", "which language")
  .option("-br, --binderRepo", "binder backed repo")
  .option("-v, --verbose", "print additional logs")
  .option("-i, --info", "print environment debug info")

  .option("--use-npm")
  .on("--help", () => {
    console.log(`    Only ${chalk.green("<project-directory>")} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`
    );
    console.log(
      `      ${chalk.cyan(
        "https://github.com/alexandercbooth/create-nteract-app/issues/new"
      )}`
    );
    console.log();
  })
  .parse(process.argv);
let language = "python";

if (typeof projectName === "undefined") {
  console.error("Please specify the project directory:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
  );
  console.log();
  console.log("For example:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("my-nteract-app")}`
  );
  console.log();
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1);
}

createApp(projectName, program.verbose, program.useNpm, language);

function createApp(name, verbose, version, useNpm, template, language) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  fs.ensureDirSync(name);

  console.log(`Creating a new nteract app in ${chalk.green(root)}.`);
  console.log();

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next",
      build: "next build",
      start: "next start",
      export: "next export"
    }
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
  const originalDirectory = process.cwd();
  process.chdir(root);
  run(root, appName, version, verbose, originalDirectory, template);
}
const exec = require("child_process").exec;
let nodePath;
exec("npm config get prefix", function(err, stdout, stderr) {
  nodePath = stdout;
});

function run(root, appName, version, verbose, originalDirectory, template) {
  const allDependencies = [
    "react",
    "react-dom",
    "next",
    "@mybinder/host-cache",
    "@nteract/messaging",
    "@nteract/transforms",
    "@nteract/presentational-components",
    "@nteract/logos",
    "rxjs",
    "lodash"
  ];

  console.log("Installing packages. This might take a couple of minutes.");
  let packageName;
  console.log(
    `Installing ${chalk.cyan("react")}, ${chalk.cyan(
      "react-dom"
    )}, ${chalk.cyan("next")}, ${chalk.cyan("@mybinder/host-cache")},
        ${chalk.cyan("@nteract/messaging")}, ${chalk.cyan(
      "@nteract/transforms"
    )}, ${chalk.cyan("@nteract/presentational-components")}
        ${chalk.cyan("rxjs")}, ${chalk.cyan("@nteract/logos")}, ${chalk.cyan(
      "lodash"
    )}`
  );
  console.log();
  const useYarn = isYarnAvailable();

  return install(root, useYarn, allDependencies, verbose)
    .then(() => packageName)
    .then(packageName => {
      const ownPath = path.join(
        nodePath.split("\n")[0],
        "lib/node_modules",
        packageJson.name
      );
      const appPath = process.cwd();
      const templatePath = path.join(ownPath, "src", "template");
      const appDefaultPage = path.join(templatePath, "pages/index.js");

      if (fs.existsSync(templatePath)) {
        fs.copySync(templatePath, appPath);
      } else {
        console.error(
          `Could not locate supplied template: ${chalk.green(templatePath)}`
        );
        return;
      }
      // Success
      let cdpath;
      if (
        originalDirectory &&
        path.join(originalDirectory, appName) === appPath
      ) {
        cdpath = appName;
      } else {
        cdpath = appPath;
      }

      // Change displayed command to yarn instead of yarnpkg
      const displayedCommand = useYarn ? "yarn" : "npm";

      console.log();
      console.log(`Success! Created ${appName} at ${appPath}`);
      console.log("Inside that directory, you can run several commands:");
      console.log();
      console.log(chalk.cyan(`  ${displayedCommand} dev`));
      console.log("    Starts the development server.");
      console.log();
      console.log(chalk.cyan(`  ${displayedCommand} build`));
      console.log("    Builds the app for production.");
      console.log();
      console.log(chalk.cyan(`  ${displayedCommand} start`));
      console.log("    Starts the production server.");
      console.log();
      console.log(chalk.cyan(`  ${displayedCommand} export`));
      console.log("    Exports to a static HTML app.");
      console.log();
      console.log();
      console.log("We suggest that you begin by typing:");
      console.log();
      console.log(chalk.cyan("  cd"), cdpath);
      console.log(`  ${chalk.cyan(`${displayedCommand} dev`)}`);
      console.log();
      console.log("Welcome to the nteract party!");
    })
    .catch(reason => {
      console.log();
      console.log("Aborting installation.");
      if (reason.command) {
        console.log(`  ${chalk.cyan(reason.command)} has failed.`);
      } else {
        console.log(chalk.red("Unexpected error. Please report it as a bug:"));
        console.log(reason);
      }
      console.log();

      // On 'exit' we will delete these files from target directory.
      const knownGeneratedFiles = ["package.json", "node_modules"];
      const currentFiles = fs.readdirSync(path.join(root));
      currentFiles.forEach(file => {
        knownGeneratedFiles.forEach(fileToMatch => {
          // This remove all of knownGeneratedFiles.
          if (file === fileToMatch) {
            console.log(`Deleting generated file... ${chalk.cyan(file)}`);
            fs.removeSync(path.join(root, file));
          }
        });
      });
      const remainingFiles = fs.readdirSync(path.join(root));
      if (!remainingFiles.length) {
        // Delete target folder if empty
        console.log(
          `Deleting ${chalk.cyan(`${appName}/`)} from ${chalk.cyan(
            path.resolve(root, "..")
          )}`
        );
        process.chdir(path.resolve(root, ".."));
        fs.removeSync(path.join(root));
      }
      console.log("Done.");
      process.exit(1);
    });
}

function install(root, useYarn, dependencies, verbose) {
  return new Promise((resolve, reject) => {
    let command;
    let args;
    if (useYarn) {
      command = "yarn";
      args = ["add", "--exact"];

      [].push.apply(args, dependencies);

      args.push("--cwd");
      args.push(root);
    } else {
      command = "npm";
      args = [
        "install",
        "--save",
        "--save-exact",
        "--loglevel",
        "error"
      ].concat(dependencies);
    }

    if (verbose) {
      args.push("--verbose");
    }

    const child = spawn(command, args, { stdio: "inherit" });
    child.on("close", code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}

function getInstallPackage(version, originalDirectory) {
  let packageToInstall = "react-scripts";
  const validSemver = semver.valid(version);
  if (validSemver) {
    packageToInstall += `@${validSemver}`;
  } else if (version) {
    if (version[0] === "@" && version.indexOf("/") === -1) {
      packageToInstall += version;
    } else if (version.match(/^file:/)) {
      packageToInstall = `file:${path.resolve(
        originalDirectory,
        version.match(/^file:(.*)?$/)[1]
      )}`;
    } else {
      // for tar.gz or alternative paths
      packageToInstall = version;
    }
  }
  return packageToInstall;
}

function getPackageName(installPackage) {
  if (installPackage.match(/^.+\.(tgz|tar\.gz)$/)) {
    return getTemporaryDirectory()
      .then(obj => {
        let stream;
        if (/^http/.test(installPackage)) {
          stream = hyperquest(installPackage);
        } else {
          stream = fs.createReadStream(installPackage);
        }
        return extractStream(stream, obj.tmpdir).then(() => obj);
      })
      .then(obj => {
        const packageName = require(path.join(obj.tmpdir, "package.json")).name;
        obj.cleanup();
        return packageName;
      })
      .catch(err => {
        // The package name could be with or without semver version, e.g. react-scripts-0.2.0-alpha.1.tgz
        // However, this function returns package name only without semver version.
        console.log(
          `Could not extract the package name from the archive: ${err.message}`
        );
        const assumedProjectName = installPackage.match(
          /^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/
        )[1];
        console.log(
          `Based on the filename, assuming it is "${chalk.cyan(
            assumedProjectName
          )}"`
        );
        return Promise.resolve(assumedProjectName);
      });
  } else if (installPackage.indexOf("git+") === 0) {
    // Pull package name out of git urls e.g:
    return Promise.resolve(installPackage.match(/([^/]+)\.git(#.*)?$/)[1]);
  } else if (installPackage.match(/.+@/)) {
    // Do not match @scope/ when stripping off @version or @tag
    return Promise.resolve(
      installPackage.charAt(0) + installPackage.substr(1).split("@")[0]
    );
  } else if (installPackage.match(/^file:/)) {
    const installPackagePath = installPackage.match(/^file:(.*)?$/)[1];
    const installPackageJson = require(path.join(
      installPackagePath,
      "package.json"
    ));
    return Promise.resolve(installPackageJson.name);
  }
  return Promise.resolve(installPackage);
}

function isYarnAvailable() {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

function getTemporaryDirectory() {
  return new Promise((resolve, reject) => {
    // Unsafe cleanup lets us recursively delete the directory if it contains
    // contents; by default it only allows removal if it's empty
    tmp.dir({ unsafeCleanup: true }, (err, tmpdir, callback) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          tmpdir: tmpdir,
          cleanup: () => {
            try {
              callback();
            } catch (ignored) {}
          }
        });
      }
    });
  });
}

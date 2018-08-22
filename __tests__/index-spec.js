const fs = require("fs");

const checkFile = file => {
  if (fs.existsSync(file)) {
    console.log(`Success! \n${file} exists!\n`);
  } else {
    console.log(`Failure! \n${file} does not exist!\n`);
  }
};

checkFile("snow-leopard");
checkFile("snow-leopard/pages/index.js");
checkFile("snow-leopard/components/code-area.js");

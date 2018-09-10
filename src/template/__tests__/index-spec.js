import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Index from "../pages";

describe("test", () => {
  it("renders the index page correctly", () => {
    const component = shallow(<Index />);
    expect(toJson(component)).toMatchSnapshot();
  });
});

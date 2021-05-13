import { shallowMount } from "@vue/test-utils";
import ProgressBar from "@/components/ProgressBar.vue";

describe("ProgressBar.vue", () => {
  it("should match snapshot", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 3, currentGroup: 1, currentGroupProgress: 35 },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render number of divs as in groupsNumber prop", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 3, currentGroup: 1, currentGroupProgress: 35 },
    });

    expect(wrapper.findAll(".group")).toHaveLength(3);
  });

  it("should apply grid-template-columns rule to container", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 3, currentGroup: 1, currentGroupProgress: 35 },
    });

    expect(wrapper.find(".progress-bar").attributes("style")).toEqual(
      "grid-template-columns: repeat(3, 1fr);"
    );
  });

  it("should give filled class for groups before current", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 5, currentGroup: 2, currentGroupProgress: 35 },
    });

    const groups = wrapper.findAll(".group");
    expect(groups.at(0).classes("filled")).toBeTruthy();
    expect(groups.at(1).classes("filled")).toBeTruthy();
    expect(groups.at(2).classes("filled")).toBeFalsy();
    expect(groups.at(3).classes("filled")).toBeFalsy();
    expect(groups.at(4).classes("filled")).toBeFalsy();
  });

  it("should give active class for current group", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 5, currentGroup: 2, currentGroupProgress: 35 },
    });

    const groups = wrapper.findAll(".group");
    expect(groups.at(0).classes("active")).toBeFalsy();
    expect(groups.at(1).classes("active")).toBeFalsy();
    expect(groups.at(2).classes("active")).toBeTruthy();
    expect(groups.at(3).classes("active")).toBeFalsy();
    expect(groups.at(4).classes("active")).toBeFalsy();
  });

  it("should render child div in current group", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 5, currentGroup: 2, currentGroupProgress: 35 },
    });

    const groups = wrapper.findAll(".group");
    expect(groups.at(0).isEmpty()).toBeTruthy();
    expect(groups.at(1).isEmpty()).toBeTruthy();
    expect(groups.at(2).isEmpty()).toBeFalsy();
    expect(groups.at(3).isEmpty()).toBeTruthy();
    expect(groups.at(4).isEmpty()).toBeTruthy();
  });

  it("should apply width on child div in current group", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: { groupsNumber: 5, currentGroup: 2, currentGroupProgress: 35 },
    });

    expect(wrapper.find(".active div").attributes("style")).toEqual(
      "width: 35%;"
    );
  });
});

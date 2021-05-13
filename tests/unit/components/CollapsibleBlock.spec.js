import { shallowMount } from "@vue/test-utils";
import CollapsibleBlock from "@/components/CollapsibleBlock.vue";

describe("CollapsibleBlock", () => {
  it("should match snapshot without optional props", () => {
    const wrapper = shallowMount(CollapsibleBlock);

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should match snapshot with optional props", () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render title in header", () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    expect(wrapper.find("header h3").text()).toEqual("Title");
  });

  it("should render slot in div.content", () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    expect(wrapper.find("div > p").text()).toEqual("slot");
  });

  it("should add collapsed class to main at start", () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    expect(wrapper.find(".collapsible").classes("collapsed")).toBeTruthy();
  });

  it("should render 'Show more' text in button in header at start", () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    expect(wrapper.find("header button").text()).toEqual("Show more");
  });

  it("should remove collapsed class to main after click on button", async () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    await wrapper.find("header button").trigger("click");

    expect(wrapper.find(".collapsible").classes("collapsed")).toBeFalsy();
  });

  it("should render 'Show less' text in button in header after click on button", async () => {
    const wrapper = shallowMount(CollapsibleBlock, {
      propsData: { title: "Title" },
      slots: { default: "<p>slot</p>" },
    });

    await wrapper.find("header button").trigger("click");

    expect(wrapper.find("header button").text()).toEqual("Show less");
  });
});

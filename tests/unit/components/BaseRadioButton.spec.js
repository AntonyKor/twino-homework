import { shallowMount } from "@vue/test-utils";
import BaseRadioButton from "@/components/BaseRadioButton.vue";

describe("BaseRadioButton", () => {
  it("should match snapshot", () => {
    const wrapper = shallowMount(BaseRadioButton, {
      propsData: { value: "val" },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should pass attrs to input", () => {
    const wrapper = shallowMount(BaseRadioButton, {
      propsData: { value: "val" },
      attrs: { test: "test" },
    });

    expect(wrapper.find("input").attributes("test")).toEqual("test");
  });

  it("should on change it should emit change event with value", async () => {
    const wrapper = shallowMount(BaseRadioButton, {
      propsData: { value: "val" },
    });

    await wrapper.find("input").trigger("change");

    expect(wrapper.emitted("change")).toHaveLength(1);
    expect(wrapper.emitted("change")[0]).toEqual(["val"]);
  });
});

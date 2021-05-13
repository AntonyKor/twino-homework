import { shallowMount } from "@vue/test-utils";
import GroupStatus from "@/components/GroupStatus.vue";

describe("GroupStatus", () => {
  it("should match snapshot without optional props", () => {
    const wrapper = shallowMount(GroupStatus, {
      propsData: { groupProgress: 35 },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should match snapshot with optional props", () => {
    const wrapper = shallowMount(GroupStatus, {
      propsData: { groupProgress: 35, groupName: "Name" },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

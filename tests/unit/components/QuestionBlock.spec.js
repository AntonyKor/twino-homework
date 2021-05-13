import { shallowMount } from "@vue/test-utils";
import QuestionBlock from "@/components/QuestionBlock.vue";
import BaseRadioButton from "@/components/BaseRadioButton.vue";

describe("QuestionBlock", () => {
  const question = {
    question: "question text",
    answers: ["a1", "a2", "a3"],
    answer: 1,
  };

  it("should match snapshot", () => {
    const wrapper = shallowMount(QuestionBlock, {
      propsData: { question },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render answers", () => {
    const wrapper = shallowMount(QuestionBlock, {
      propsData: { question },
    });

    expect.hasAssertions();
    const labels = wrapper.findAll("label");
    question.answers.forEach((text, i) =>
      expect(labels.at(i).text()).toEqual(text)
    );
  });

  it("should pass current answer to modelValue to BaseRadioButton", () => {
    const wrapper = shallowMount(QuestionBlock, {
      propsData: { question },
    });

    expect.hasAssertions();
    const buttons = wrapper.findAllComponents(BaseRadioButton);
    question.answers.forEach((_, i) =>
      expect(buttons.at(i).props("modelValue")).toEqual(question.answer)
    );
  });

  it("should pass index to value to BaseRadioButton", () => {
    const wrapper = shallowMount(QuestionBlock, {
      propsData: { question },
    });

    expect.hasAssertions();
    const buttons = wrapper.findAllComponents(BaseRadioButton);
    question.answers.forEach((_, i) =>
      expect(buttons.at(i).props("value")).toEqual(i)
    );
  });

  it("should pass emit set-answer on change event on BaseRadioButton", () => {
    const wrapper = shallowMount(QuestionBlock, {
      propsData: { question },
    });

    wrapper.findAllComponents(BaseRadioButton).at(2).vm.$emit("change", 2);

    expect(wrapper.emitted("set-answer")).toHaveLength(1);
    expect(wrapper.emitted("set-answer")[0]).toEqual([2]);
  });
});

import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import App from "@/App.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import GroupStatus from "@/components/GroupStatus.vue";
import QuestionBlock from "@/components/QuestionBlock.vue";
import { getQuestions } from "@/api";

jest.mock("@/api", () => ({
  getQuestions: jest.fn().mockResolvedValue([
    {
      title: "group1",
      questions: [
        { question: "question1", answers: ["a1", "a2"], answer: 1 },
        { question: "question2", answers: ["a3"] },
      ],
    },
    {
      title: "group2",
      questions: [{ question: "question3", answers: ["a5", "a6"] }],
    },
  ]),
}));

describe("App", () => {
  const renderAppWithData = async () => {
    const wrapper = shallowMount(App);

    await Vue.nextTick();
    await Vue.nextTick();

    return wrapper;
  };
  const goToLastPage = async (wrapper) => {
    await wrapper.find(".next").trigger("click");
    wrapper.findComponent(QuestionBlock).vm.$emit("set-answer", 0);
    await Vue.nextTick();
    await wrapper.find(".next").trigger("click");
  };

  it("should match snapshot before data was loaded", () => {
    const wrapper = shallowMount(App);

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should match snapshot after data was loaded", async () => {
    const wrapper = await renderAppWithData();

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call getQuestions", () => {
    shallowMount(App);

    expect(getQuestions).toBeCalled();
  });

  it("should pass props to ProgressBar", async () => {
    const wrapper = await renderAppWithData();

    expect(wrapper.findComponent(ProgressBar).props()).toEqual({
      currentGroup: 0,
      currentGroupProgress: 50,
      groupsNumber: 2,
    });
  });

  it("should pass props to GroupStatus", async () => {
    const wrapper = await renderAppWithData();

    expect(wrapper.findComponent(GroupStatus).props()).toEqual({
      groupName: "group1",
      groupProgress: 50,
    });
  });

  it("should pass current question to QuestionBlock", async () => {
    const wrapper = await renderAppWithData();

    expect(wrapper.findComponent(QuestionBlock).props()).toEqual({
      question: { question: "question1", answers: ["a1", "a2"], answer: 1 },
    });
  });

  it("should change current question on click next button if question is answered", async () => {
    const wrapper = await renderAppWithData();

    await wrapper.find(".next").trigger("click");

    expect(wrapper.findComponent(QuestionBlock).props()).toEqual({
      question: { question: "question2", answers: ["a3"] },
    });
  });

  it("should not change current question on click next button if question is not answered", async () => {
    const wrapper = await renderAppWithData();
    await wrapper.find(".next").trigger("click");

    await wrapper.find(".next").trigger("click");

    expect(wrapper.find(".next")).toBeTruthy();
  });

  it("should not render error at start", async () => {
    const wrapper = await renderAppWithData();

    expect(wrapper.find(".error").exists()).toBeFalsy();
  });

  it("should render error after click next button if question is not answered", async () => {
    const wrapper = await renderAppWithData();
    await wrapper.find(".next").trigger("click");

    await wrapper.find(".next").trigger("click");

    expect(wrapper.find(".error").exists()).toBeTruthy();
  });

  it("should change ProgressBar props after answer", async () => {
    const wrapper = await renderAppWithData();
    await wrapper.find(".next").trigger("click");

    wrapper.findComponent(QuestionBlock).vm.$emit("set-answer", 2);
    await Vue.nextTick();

    expect(wrapper.findComponent(ProgressBar).props()).toEqual({
      currentGroup: 1,
      currentGroupProgress: 0,
      groupsNumber: 2,
    });
  });

  it("should change GroupStatus props after answer", async () => {
    const wrapper = await renderAppWithData();
    await wrapper.find(".next").trigger("click");

    wrapper.findComponent(QuestionBlock).vm.$emit("set-answer", 2);

    expect(wrapper.findComponent(GroupStatus).props()).toEqual({
      groupName: "group1",
      groupProgress: 100,
    });
  });

  it("should change GroupStatus props after navigating to next group", async () => {
    const wrapper = await renderAppWithData();
    await wrapper.find(".next").trigger("click");
    wrapper.findComponent(QuestionBlock).vm.$emit("set-answer", 2);

    await wrapper.find(".next").trigger("click");

    expect(wrapper.findComponent(GroupStatus).props()).toEqual({
      groupName: "group2",
      groupProgress: 0,
    });
  });

  it("should not render back button on first question", async () => {
    const wrapper = await renderAppWithData();

    expect(wrapper.find(".previous").exists()).toBeFalsy();
  });

  it("should render back button on other questions", async () => {
    const wrapper = await renderAppWithData();

    await wrapper.find(".next").trigger("click");

    expect(wrapper.find(".previous").exists()).toBeTruthy();
  });

  it("should change current question on click back button", async () => {
    const wrapper = await renderAppWithData();
    await wrapper.find(".next").trigger("click");

    await wrapper.find(".previous").trigger("click");

    expect(wrapper.findComponent(QuestionBlock).props()).toEqual({
      question: { question: "question1", answers: ["a1", "a2"], answer: 1 },
    });
  });

  it("should not render next button on last question", async () => {
    const wrapper = await renderAppWithData();

    await goToLastPage(wrapper);

    expect(wrapper.find(".next").exists()).toBeFalsy();
  });

  it("should not render view overview button if test is not passed", async () => {
    const wrapper = await renderAppWithData();

    await goToLastPage(wrapper);

    expect(wrapper.find(".next").exists()).toBeFalsy();
  });

  it("should render view overview button if test is passed", async () => {
    const wrapper = await renderAppWithData();

    await goToLastPage(wrapper);
    wrapper.findComponent(QuestionBlock).vm.$emit("set-answer", 0);
    await Vue.nextTick();

    expect(wrapper.find(".next").exists()).toBeTruthy();
    expect(wrapper.find(".next").text()).toEqual("View overview");
  });
});

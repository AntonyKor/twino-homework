import { shallowMount } from "@vue/test-utils";
import OverviewScreen from "@/components/OverviewScreen.vue";
import CollapsibleBlock from "@/components/CollapsibleBlock.vue";

describe("OverviewScreen", () => {
  const groups = [
    {
      title: "group1",
      questions: [
        { question: "question1", answers: ["a1", "a2"], answer: 1 },
        { question: "question2", answers: ["a3"], answer: 0 },
      ],
    },
    {
      title: "group2",
      questions: [{ question: "question3", answers: ["a5", "a6"], answer: 0 }],
    },
  ];

  it("should match snapshot", () => {
    const wrapper = shallowMount(OverviewScreen, {
      propsData: { groups },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render CollapsibleBlock for every group", () => {
    const wrapper = shallowMount(OverviewScreen, {
      propsData: { groups },
    });

    expect.hasAssertions();
    const collapsibleBlocks = wrapper.findAllComponents(CollapsibleBlock);
    groups.forEach((group, i) =>
      expect(collapsibleBlocks.at(i).props("title")).toEqual(group.title)
    );
  });

  it("should render every question with answer", () => {
    const wrapper = shallowMount(OverviewScreen, {
      propsData: { groups },
    });

    expect.hasAssertions();
    const collapsibleBlocks = wrapper.findAllComponents(CollapsibleBlock);
    groups.forEach((group, i) =>
      group.questions.forEach((question, j) => {
        expect(collapsibleBlocks.at(i).findAll("h4").at(j).text()).toEqual(
          question.question
        );
        expect(collapsibleBlocks.at(i).findAll("a").at(j).text()).toEqual(
          question.answers[question.answer]
        );
      })
    );
  });

  it("should emit 'question-select' event on click on a", async () => {
    const wrapper = shallowMount(OverviewScreen, {
      propsData: { groups },
    });

    await wrapper
      .findAllComponents(CollapsibleBlock)
      .at(1)
      .find("a")
      .trigger("click");

    expect(wrapper.emitted("question-select")).toHaveLength(1);
    expect(wrapper.emitted("question-select")[0]).toEqual([
      {
        groupIndex: 1,
        questionIndex: 0,
      },
    ]);
  });
});

import { getQuestions } from "@/api";

describe("getQuestions", () => {
  const groups = [
    {
      title: "group1",
      questions: [
        { question: "question1", answers: ["a1", "a2"] },
        { question: "question2", answers: ["a3"] },
      ],
    },
    {
      title: "group2",
      questions: [{ question: "question3", answers: ["a5", "a6"] }],
    },
  ];

  const initialFetch = window.fetch;
  const respJsonMock = jest.fn().mockResolvedValue({ groups });

  beforeAll(() => {
    window.fetch = jest.fn().mockResolvedValue({ json: respJsonMock });
  });

  afterAll(() => {
    window.fetch = initialFetch;
  });

  it("should call fetch with proper url", async () => {
    await getQuestions();

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith("/suitability");
  });

  it("should return responce json", async () => {
    const result = await getQuestions();

    expect(result).toEqual(groups);
  });
});

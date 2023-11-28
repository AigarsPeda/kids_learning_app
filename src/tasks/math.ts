// export const MATH_TASKS = [
//   {
//     id: 1,
//     title: "Addition",
//     description: "Atrodi nezināmo skaitli",
//     difficulty: "easy",
//     points: 2,
//     type: "math",
//     data: {
//       a: 1,
//       b: undefined,
//       result: 3,
//       option: [1, 2, 3, 4, 5],
//     },
//   },
//   {
//     id: 2,
//     title: "Addition",
//     description: "Atrodi nezināmo skaitli",
//     difficulty: "easy",
//     points: 2,
//     type: "math",
//     data: {
//       a: undefined,
//       b: 2,
//       result: 3,
//       option: [1, 2, 3, 4, 5],
//     },
//   },
//   {
//     id: 3,
//     title: "Addition",
//     description: "Atrodi nezināmo skaitli",
//     difficulty: "easy",
//     points: 2,
//     type: "math",
//     data: {
//       a: 1,
//       b: 2,
//       result: undefined,
//       option: [1, 2, 3, 4, 5],
//     },
//   },
// ];

export const MATH_TASKS = {
  easy: {
    points: 2,
    type: "addition",
    description: "Atrodi nezināmo skaitli",
    tasks: [
      {
        id: 1,
        kind: "missingNumber",
        data: {
          a: 1,
          b: undefined,
          result: 3,
        },
      },
      {
        id: 2,
        kind: "missingNumber",
        data: {
          a: undefined,
          b: 2,
          result: 3,
        },
      },
      {
        id: 3,
        kind: "missingNumber",
        data: {
          a: 1,
          b: 2,
          result: undefined,
        },
      },
    ],
  },
};

export function teachers(classes) {
  const categories = {};

  for (let i = 0; i < classes.length; i++) {
    const tests = classes[i].tests;
    const disciplineName = classes[i].discipline.name;
    const disciplineTerm = classes[i].discipline.term.number;

    for (let j = 0; j < tests.length; j++) {
      const categoryName = tests[j].category.name;
      const newTest = { ...tests[j], disciplineName, disciplineTerm };

      if (categories[categoryName]) {
        categories[categoryName].push(newTest);
      } else {
        categories[categoryName] = [newTest];
      }
    }
  }

  return Object.entries(categories);
}

export function terms(classes) {
  const categories = {};

  for (let i = 0; i < classes.length; i++) {
    const tests = classes[i].tests;
    const teacher = classes[i].teacher.name;

    for (let j = 0; j < tests.length; j++) {
      const testCategory = tests[j].category.name;
      if (categories[testCategory]) {
        categories[testCategory].push({ ...tests[j], teacher });
      } else {
        categories[testCategory] = [{ ...tests[j], teacher }];
      }
    }
  }

  return Object.entries(categories);
}
export function teachers(classes) {
  const categories = {};

  for (let i = 0; i < classes.length; i++) {
    const tests = classes[i].tests;
    const disciplineName = classes[i].discipline.name;
    const termNumber = classes[i].discipline.term.number;

    for (let j = 0; j < tests.length; j++) {
      const categoryName = tests[j].category.name;
      const newTest = { ...tests[j], disciplineName, termNumber };

      if (categories[categoryName]) {
        categories[categoryName].push(newTest);
      } else {
        categories[categoryName] = [newTest];
      }
    }
  }

  return Object.entries(categories);
}

export function terms(classes, termNumber) {
  const categories = {};

  for (let i = 0; i < classes.length; i++) {
    const tests = classes[i].tests;
    const teacher = classes[i].teacher.name;
    
    for (let j = 0; j < tests.length; j++) {
      const categoryName = tests[j].category.name;
      const newTest = { ...tests[j], teacher, termNumber };

      if (categories[categoryName]) {
        categories[categoryName].push(newTest);
      } else {
        categories[categoryName] = [newTest];
      }
    }
  }

  return Object.entries(categories);
}
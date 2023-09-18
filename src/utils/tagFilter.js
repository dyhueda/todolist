export function tagFilter(filter, todo) {
  let FilteredList = [];
  todo.map((todo) => {
    todo.tags.map((tag) => {
      if (tag.title === filter) {
        FilteredList.push(todo);
      }
    });
  });
  return FilteredList;
}

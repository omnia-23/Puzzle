let maxId = 4;
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

function check() {
  let num = $("#demo").children().length;
  console.log(num);
  if (num === maxId) {
    let flag = true;
    for (let i = 0; i < maxId; i++) {
      let id = $("#demo").children().eq(i).attr("id");
      if (i + 1 != id) {
        flag = false;
      }
    }
    if (flag) {
      Swal.fire({
        title: "Good Job",
        text: "nice work!",
      });
    } else {
      Swal.fire({
        title: "ops........... ",
        text: "nice work!",
      });
    }
  }
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    check();
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

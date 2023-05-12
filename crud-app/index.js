function validateForm() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  //validate value for each field.
  if (name === "") {
    alert("Name is required!");
    return false;
  } else if (age === "") {
    alert("Age is required!");
    return false;
  } else if (age < 1) {
    alert("Age must be a valid number");
  } else if (email === "") {
    alert("Email is required!");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address!");
    return false;
  } else if (address === "") {
    alert("Address is required!");
    return false;
  }
  return true;
}

function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") === null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  //parse peopleList data then use map to render html
  const html = peopleList.map((element, index) => {
    return `<tr>
        <td>${element.name}</td>
        <td>${element.age}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>
          <button onclick="deleteData(${index})" class="btn btn-danger">
            Delete
          </button>
          <button onclick="updateData(${index})" class="btn btn-warning m-2">
            Update
          </button>
        </td>
      </tr>`;
  });
  //select tbody ò the id crudTable to render that html
  document.querySelector("#crudTable tbody").innerHTML = html.join();
}
//Load data when the page is loaded
document.onload = showData();

function addData() {
  if (validateForm()) {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    let peopleList;
    if (localStorage.getItem("peopleList") === null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      name,
      age,
      email,
      address,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("age").value = "";
  }
}

function deleteData(index) {
  let peopleList;
  if (localStorage.getItem("peopleList") === null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  let peopleList;
  if (localStorage.getItem("peopleList") === null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() === true) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

      //clear input value after clicking update button
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("address").value = "";
      document.getElementById("age").value = "";
    }
  };
}

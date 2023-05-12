DAY 1 - Dựng HTML sử dụng boostrap:

Trước tiên hãy tạo template của HTML bằng cách gõ "!" trên file HTML ở VSCode, sau đó paste link này vào phần head của HTML

<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
    crossorigin="anonymous"
/>

Tiếp theo chúng ta sẽ tạo 1 file css và đặt tên nó là "styles.css", thẻ link css này nên được đặt ở dưới thẻ link của boostrap nhằm tránh bị ghi đè.

Trong file css, chúng ta cấu hình như sau:

- {
  color: #fff;
  }
  body {
  background: #1d2630;
  }

#Update {
display: none;
}

Sau đó chúng ta cùng tạo giao diện sử dụng thư viện boostrap:

  <div class="container">
      <h2 class="mt-5 mb-5">CRUD Application using localStorage</h2>
      <div class="mb-5">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div class="form-group col-md-6 mb-3">
            <label for="age">Age</label>
            <input
              type="number"
              name="age"
              class="form-control"
              id="age"
              placeholder="Enter age"
            />
          </div>
          <div class="form-group col-md-6 mb-3">
            <label for="address">Address</label>
            <input
              type="text"
              name="address"
              class="form-control"
              id="address"
              placeholder="Enter address"
            />
          </div>
          <div class="form-group col-md-6 mb-3">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              class="form-control"
              id="email"
              placeholder="Enter name"
            />
          </div>
          <div class="col-lg-12 mt-5">
            <button class="btn btn-success" id="Submit" >
              Add</button
            ><button class="btn btn-primary" id="Update">Update</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="row mt-5">
        <div class="col-12">
          <table class="table table-bordered" id="crudTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
  </div>

DAY 2 - Xây dựng chức năng validate fields và chức năng hiển thị dữ liệu cho ứng dụng

Trước tiên hãy tạo 1 file index.js cùng cấp với thư mục của file HTML,
sau đó import file này vào cuối của thẻ body:
<script src="./index.js"></script>

Sau đó click vào file index.js, chúng ta viết như sau:

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

Trong hàm validateForm, chúng ta sẽ lấy id của các thẻ HTML tương ứng với "name", "age", "email" và "address" và gọi đến attribute value. Sau khi lấy được attribute value, chúng ta sẽ viết 1 chuỗi if else để check giá trị của các thẻ HTML đó, nếu 1 trong các giá trị của các thẻ đó là chuỗi rỗng ("") thì sẽ trả về giá trị của hàm là false.

Sau đó, chúng ta tiếp tục tạo thêm 1 hàm showData như sau:

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

  document.querySelector("#crudTable tbody").innerHTML = html.join();
}

Trong hàm showData ở trên, chúng ta khởi tạo 1 biến có tên peopleList nhưng chưa gán cụ thể cho nó là kiểu dữ liệu nào, cho đến khi chạy vào câu điều kiện if else ở dưới, khi chạy đến câu điều kiện này thì js sẽ kiểm tra xem ở localStorage có dữ liệu mang tên "peopleList" hay không,
nếu không (= null) thì sẽ gán cho nó thành 1 mảng rỗng, còn nếu có dữ liệu thì thì parse (biến đổi dạng string của json thành đoạn dữ liệu JS thường), khi parse như vậy thì sẽ có dữ liệu của 1 mảng bao gồm các dữ liệu được lấy từ localStorage.

Tiếp theo chúng ta khởi tạo 1 biến có tên "html" và sử dụng hàm map + template literal để tạo ra chuỗi html hợp lệ, sau đó chúng ta sẽ querySelector của table có id "crudTable" và chọc đến tbody, tiếp theo chúng ta sẽ gán innerHTML của tbody = html và convert nó thành dạng string bằng cách sử dụng join().

Cuối cùng chúng ta sẽ thêm dòng này ở ngoài function:
document.onload = showData();

Chúng ta gọi đến hàm onload của đối tượng document để đảm bảo rằng hàm sẽ được chạy sau khi page được tải xong.

DAY 3 - Xây dựng chức năng thêm của ứng dụng:

Trước tiên chúng ta sẽ khởi tạo 1 hàm để thêm dữ liệu như sau

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

Ở hàm addData trên chúng ta sẽ tạo 1 block if else cùng với gọi hàm validateForm() để kiểm tra xem các trường dữ liệu kia có thực sự hợp lệ hay không, nếu hợp lệ thì sẽ tiếp tục chạy block if else ở dưới và parse dữ liệu, sau đó gán ngược lại vào biến peopleList ở trong hàm addData, tiếp theo sẽ chạy đến lệnh push và sau đó stringify lại những dữ liệu đã được điền vào localStorage. Tiếp theo hàm showData() được gọi để có thể render lại dữ liệu lên HTML. Cuồi cùng là clear những dữ liệu trên các thẻ input bằng việc gán ngược lại bằng chuỗi rỗng.

DAY 4 - Xây dựng chức năng sửa của ứng dụng:

Trước tiên chúng ta sẽ khởi tạo 1 hàm để thêm dữ liệu như sau

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

Trong hàm updateData này chúng ta sẽ cần phải định nghĩa 1 tham số đầu vào (index) để có thể nhận được dữ liệu từ hàm map của hàm showData(), tiếp theo 2 dòng getElement để trỏ đến thẻ button để chúng ta có thể ẩn / hiện bằng việc thêm css cho nó.

Giống như các hàm ở trên, chúng ta định nghĩa biến peopleList sau đó kiểm tra nếu hợp lệ thì sẽ parse hoặc gán ngược lại bằng 1 mảng rỗng. Tiếp theo ở dòng 106 > 109, chúng ta tiếp tục getElement bằng id và chọc đến attribute value của các thẻ input và sau đó gán ngược lại bằng mảng peopleList của index được click vào.

Tiếp theo chúng ta querySelector đến đối tượng có id là Update và gán nó vào 1 hàm onclick để có thể cập nhật lại dữ liệu trong mảng peopleList.

DAY 5 - Xây dựng chức năng xóa của ứng dụng:

Trước tiên chúng ta vẫn sẽ khởi tạo 1 function như sau

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

Giống như việc update, chúng ta cần định nghĩa 1 tham số index cho function để có thể nhận được dữ liệu từ hàm map của showData()

Tiếp theo chúng ta vẫn sẽ kiểm tra xem localStorage có hợp lệ hay không và sau đó parse hoặc gán lại bằng 1 mảng rỗng cho peopleList.

Sau đó chúng ta sử dụng splice và truyền vào index muốn xóa và set lại localStorage khi đã hoàn thành xóa.

--------------

Tham khảo:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://getbootstrap.com/docs/5.3/getting-started/introduction/
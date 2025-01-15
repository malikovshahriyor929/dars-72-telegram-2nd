if (!localStorage.getItem("access")) {
  localStorage.removeItem("access");
  window.location.href = "./login.html";
}
let BASE_URL = "https://67828199c51d092c3dcfc05f.mockapi.io/telegram/message";
let contacts = document.querySelector(".contacts");
let messages = document.querySelector(".messages");
// login
let name = document.querySelector(".name");
let check = JSON.parse(localStorage.getItem("name"));
let userid = JSON.parse(localStorage.getItem("userid"));
let clicked_id = JSON.parse(localStorage.getItem("clicked_id")) || 0;
let yourAvatar = document.querySelector(".yourAvatar");
let phoneNum = document.querySelector(".phoneNum");
let username = document.querySelector(".username");
//nothing
// let resive = "";
//input things
let message_form = document.querySelector(".message_form");
let online = document.querySelector(".online");
let message_input = document.querySelector(".message_input");

// time
let date = new Date();
let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
let minute =
  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
// log
let logout = document.querySelector(".logout");
// avatar
let avatar = document.querySelector("#avatar");
// right_side
let rigth_side = document.querySelector(".rigth_side");
rigth_side.style.display = "none";
let iTake = "";

// logout
logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./login.html";
});
// get message
function fetchfunc() {
  fetch(BASE_URL)
    .then((data) => data.json())
    .then((data) => {
      checkfunc(data);
    });
}
// chats
contacts.addEventListener("click", (e) => {
  localStorage.setItem("clicked_id", JSON.stringify(e.target.id));
  if (e.target.classList.contains("con") && clicked_id == e.target.id) {
    fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api")
      .then((data) => data.json())
      .then((data) =>
        data.forEach((value) => {
          if (value.id == clicked_id) {
            avatar.src = value.img;
            name.innerHTML = value.name;
          }
        })
      );
    // console.log(e.target.id);
    iTake = e.target.id;
    rigth_side.style.display = "block";
  } else {
    window.location.reload();
  }
});

// typing
message_input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (message_input.value.length > 4) {
    online.innerHTML = "typing...";
  } else {
    online.innerHTML = "online";
  }
});

//   message_form
message_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (message_input.value !== "" && message_input.value !== " ") {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message_input.value,
        time: hour + ":" + minute,
        userid: JSON.parse(localStorage.getItem("userid")),
        name: JSON.parse(localStorage.getItem("name")),
        resive: JSON.parse(localStorage.getItem("clicked_id")),
      }),
    })
      .then((data) => data.json())
      .then((data) => checkfunc([data]));
  }
  message_input.value = "";
});

// put messages
function checkfunc(data) {
  data.forEach((value) => {
    if (value.userid == userid && value.resive == clicked_id) {
      let text = document.createElement("div");
      text.innerHTML = `
      <div  class="flex items-end  flex-col">
              <div
                class="bg-[#effedd] relative flex flex-col items-end w-fit p-[9px_15px_0_15px] pb-5 m-3 rounded-md rounded-br-none min-w-[70px] "
              >
                <p class="text-[18px] message_for_green ">
               ${value.message}
                </p>
                <p
                  class="text-[12px] text-[#62ac55] absolute bottom-1 right-1 flex gap-2 items-center"
                >
                  ${value.time} <img src="./assets/svg/ticket.svg" alt="" />
                </p>
                <img
                  class="absolute bottom-0 h-4 right-[-8px]"
                  src="./assets/svg/mymess.svg"
                  alt=""
                />
              </div>
            </div>
    `;
      messages.append(text);
    } else if (value.userid == clicked_id && value.resive == userid) {
      let text = document.createElement("div");
      text.innerHTML = `
      <div class="flex flex-col items-start message_for_white">
              <div
                class="bg-white relative flex flex-col items-end w-fit p-[9px_15px_0_15px] pb-5 m-3 rounded-lg rounded-bl-none"
                >
                <p class="text-[18px]">
                  ${value.message}
                </p>
                <p
                  class="text-[12px] text-[#a1aab3] absolute bottom-1 right-2 flex gap-2 items-center"
                >
                  12:06
                </p>
                <img
                  class="absolute bottom-0 h-4 left-[-5px]"
                  src="./assets/svg/yourmess.svg"
                  alt=""
                />
              </div>
            </div>
                  `;

      messages.append(text);
    }
  });
}

// get data for side bar or chats
function getFetchFunc() {
  fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api")
    .then((data) => data.json())
    .then((data) => contactsfunc(data));
}

// function for left bar chats
function contactsfunc(data) {
  data.forEach((value) => {
    if (value.name !== check) {
      let contact = document.createElement("div");
      contact.classList.add(value.id);
      contact.innerHTML = `
              <div id=${value.id} class="con select-none flex gap-3 p-3 border-b ">
          <img class=" h-14 w-14 rounded-full " src="${value.img}" alt="" />
            <div class="flex flex-col justify-between">
              <p class="flex items-center gap-3 font-medium  text-[#222]">${value.name}
                <img src="./assets/svg/worth_thing_in_telegram.svg" alt="" />
              </p>
              <p  class="text-[15px] messagep text-[#8d8e90]">
              Sended message
              </p>
            </div>
        </div>            
            `;
      contacts.append(contact);
    } else if (value.name == check) {
      yourAvatar.src = value.img;
      phoneNum.innerHTML = value.phone;
      username.innerHTML = value.name;
    }
  });
}

// let setting = document.querySelector(".setting");
// setting.addEventListener("click", (e) => {
//   let inputs_for_profile = document.querySelector(".inputs_for_profile");
//   inputs_for_profile.style.display = "flex";
//   let avatarInput = document.querySelector(".avatarInput");
//   let usernameInput = document.querySelector(".usernameInput");
//   let phoneNumInput = document.querySelector(".phoneNumInput");

//   // usernameInput.value = username.innerHTML
//   // phoneNumInput.value = phoneNum.innerHTML
//   // username = ""
//   // phoneNum = ""
//   // yourAvatar = ""

//   // let file = avatarInput.files[0];
//   // console.log(file);
//   // let reander = new FileReader();
//   // reander.onload = function (e) {
//   //   let imgUrl = e.target.result;
//   //   // console.log(imgUrl);

//   //   // fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api",{
//   //   //   method:"PUT",
//   //   //   headers:{"Content-Type":"application/json"},
//   //   //   body:JSON.stringify({

//   //   //   })
//   //   // });
//   // };
//   // reander.readAsDataURL(file)
//   // avatarDiv.append(avatarInput);
//   // username.append(usernameInput);
//   // phoneNum.append(phoneNumInput);
// });

fetchfunc();
getFetchFunc();

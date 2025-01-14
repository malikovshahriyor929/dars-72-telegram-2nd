if (!localStorage.getItem("access")) {
  localStorage.removeItem("access");
  window.location.href = "./login.html";
}
let BASE_URL = "https://67828199c51d092c3dcfc05f.mockapi.io/telegram/message";
let contacts = document.querySelector(".contacts");
let messages = document.querySelector(".messages");
// login 
let name = document.querySelector(".name");
name.textContent = JSON.parse(localStorage.getItem("name"));
let check = JSON.parse(localStorage.getItem("name"));
let userid = JSON.parse(localStorage.getItem("userid"));
//nothing
let resive = "";
//input things
let message_form = document.querySelector(".message_form");
let online =document.querySelector(".online")
let message_input = document.querySelector(".message_input");

// time
let date = new Date();
let hour = date.getHours() <= 10 ? "0" + date.getHours() : date.getHours();
let minute =
date.getMinutes() <= 10 ? "0" + date.getMinutes():date.getMinutes();
// log
let logout = document.querySelector(".logout");
// avatar
let avatar = document.querySelector("#avatar")

// logout
logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./login.html";
});

// nothing
 contacts.addEventListener("click", (e) => {
  // if (e.target.classList.contains("con")) {
  //   resive = e.target.id;
  // }
 });


// typing 
message_input.addEventListener("keyup",(e)=>{
  e.preventDefault()
  if(message_input.value.length > 4){
    online.innerHTML = "typing..."
  }else{

    online.innerHTML = "online"
  }
  
})

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
        resive: resive,
      }),
    })
      .then((data) => data.json())
      .then(() => window.location.reload());
  }
  message_input.value = "";
});

// get message
function fetchfunc() {
  fetch(BASE_URL)
    .then((data) => data.json())
    .then((data) => {
      checkfunc(data);
    });
}

// put messages
function checkfunc(data) {
  data.forEach((value) => {
    if (value.name == check && value.userid == userid) {
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
    } else {
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

// function for chats
function contactsfunc(data) {
  data.forEach((value) => {
    if (value.name !== check) {
      // console.log(value.message);
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
      avatar.src = value.img
    }
    // console.log(value.img);
  });
  // console.log(data);
}

fetchfunc();
getFetchFunc();

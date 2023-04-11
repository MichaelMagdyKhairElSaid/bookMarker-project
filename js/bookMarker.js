let linksArray;
let submitBtn = document.querySelector("#submitBtn");
// let visitBtn = document.querySelectorAll(".visitBtn");
// let btndelete = document.querySelectorAll(".btndelete");
let siteName = document.querySelector("#siteName");
let siteUrl = document.querySelector("#siteUrl");
let nameError = document.querySelector("#nameError");
let urlError = document.querySelector("#urlError");

if (localStorage.getItem("linksArray") == null) {
  linksArray = [];
} else {
  linksArray = JSON.parse(localStorage.getItem("linksArray"));
  displayArray(linksArray);
}

submitBtn.addEventListener("click", function () {

  let flagName = validateSiteName();
  let flagLink = validateSiteLink();
  console.log(flagLink)
  console.log(flagName)
  if (flagName && flagLink) {
    let newlink = {
      name: siteName.value,
      link: siteUrl.value,
    };
    console.log(newlink)
    linksArray.push(newlink);
    displayArray(linksArray);
    clearInput()
  }
});

// for (let i = 0; i < visitBtn.length; i++) {
//   visitBtn[i].addEventListener("click", function () {
//     console.log("hi");
//   });
// }
// first open condition

// ================functions=======================
function clearInput() {
  document.querySelector("#siteName").value = "";
  document.querySelector("#siteUrl").value = "";
}
function deletelink(index) {
linksArray.splice(index,1)
displayArray(linksArray)
localStorage.setItem("linksArray", JSON.stringify(linksArray));
}
function displayArray(Array) {
  let box = ``;
  for (let i = 0; i < Array.length; i++) {
    box += `
<div class="row row-cols-3 rowGradiant  my-5 p-3" id="${Array[i].name}" >
<div class="col">
    <h2 class="fs-5 fw-medium" >${Array[i].name}</h2>
</div>
<div class="col">
    <a class="btn btn-primary visitBtn "
        href="${Array[i].link}"
        target="_blank">visit</a>
    <button class="btn btn-danger btndelete" onclick="deletelink(${i})">Delete</button>
</div>
</div>
`;
  }
  document.querySelector("#LinksContainer").innerHTML = box;
  localStorage.setItem("linksArray", JSON.stringify(Array));
}


// ===================validation========================
function validateSiteName() {
  let regex = /\w/s;
  if (regex.test(siteName.value)) {
    nameError.classList.add("d-none");
    console.log(`name is ok `+siteName.value);
    return true;
  } else {
    nameError.classList.remove("d-none");
    console.log(`name is not ok `+siteName.value);
    return false;
  }
}
function validateSiteLink() {
  let regex = /^(http|https)(\:\/\/)/s;
  if (regex.test(siteUrl.value)) {
    urlError.classList.add("d-none");
    console.log(`link is ok `+siteUrl.value);
    return true;
  } else {
    urlError.classList.remove("d-none");
    console.log(`link is not ok `+siteUrl.value);
    return false;
  }
}

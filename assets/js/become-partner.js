// -------------------- form -----------------
const scriptURL =
"https://script.google.com/macros/s/AKfycbzDsWpxWMXf4Y__MzNIe5naI64STMhQ1rTaW_SH0y9riW5OVpVn4nsyivoPLnDqQKfv/exec";
const form = document.forms["submit-to-google-sheet"];

// ----- form validation & Submission -----

document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const jobType = document.querySelector(
    'input[name="jobtype"]:checked'
  )?.value;
  const experience = parseFloat(document.getElementById("experience").value);
  const errorMsg = document.getElementById("errorMsg");

  if (jobType === "experience" && (isNaN(experience) || experience < 1)) {
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  //logic to simulate form submission----
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    //.then(response => console.log('Success!', response)) //for no msg display background only...
    .then(
      alert("The message was sent successfully, we will connect you later... \nThank you for your time !!")
    )
    .catch((error) => console.error("Error!", error.message));

   //form-reset----
  document.getElementById("jobForm").reset();
});

document.getElementById("jobForm").addEventListener("reset", function () {
  document.getElementById("errorMsg").style.display = "none";
});

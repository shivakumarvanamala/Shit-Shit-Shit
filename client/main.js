// Get modals and buttons
var signUpModal = document.getElementById("signUpModal");
var signInModal = document.getElementById("signInModal");

var signUpBtn = document.querySelector(".sign-up");
var signInBtn = document.querySelector(".sign-in");

var closeSignUp = document.getElementById("closeSignUp");
var closeSignIn = document.getElementById("closeSignIn");

var userDisplay = document.getElementById("user-display"); // Element to show username

// Show SignUp modal when SignUp button is clicked
signUpBtn.onclick = function () {
  signUpModal.style.display = "block";
};

// Show SignIn modal when SignIn button is clicked
signInBtn.onclick = function () {
  signInModal.style.display = "block";
};

// Close SignUp modal
closeSignUp.onclick = function () {
  signUpModal.style.display = "none";
};

// Close SignIn modal
closeSignIn.onclick = function () {
  signInModal.style.display = "none";
};

// Close modals if clicking outside modal
window.onclick = function (event) {
  if (event.target == signUpModal) {
    signUpModal.style.display = "none";
  }
  if (event.target == signInModal) {
    signInModal.style.display = "none";
  }
};

// Disable buttons after form submit
const disableButton = (button) => {
  button.disabled = true;
  button.innerHTML = "Processing...";
};

// Update UI to show the user's name
const updateUIWithUsername = (username) => {
  userDisplay.innerHTML = `Welcome, <strong>${username} <spam>👋</span></strong>`;
  signUpBtn.style.display = "none";
  signInBtn.style.display = "none";
  userDisplay.style.display = "block"; // Make sure this is visible
};

// signUp form submission
document.getElementById("signUpForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const signupData = {
    username: document.getElementById("signup-username").value,
    email: document.getElementById("signup-email").value,
    password: document.getElementById("signup-password").value,
    address: document.getElementById("signup-address").value,
    mobile: document.getElementById("signup-mobile").value,
  };

  const submitButton = document.getElementById("signup-submit");
  disableButton(submitButton);

  try {
    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { response: { data } };
    }

    alert(data.message);
    signUpModal.style.display = "none";
    updateUIWithUsername(data.username); // Replace buttons with username
  } catch (error) {
    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
    submitButton.disabled = true;
  }
});

// signIn form submission
document.getElementById("signInForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const signinData = {
    email: document.getElementById("signin-email").value,
    password: document.getElementById("signin-password").value,
  };

  const submitButton = document.getElementById("signin-submit");
  disableButton(submitButton);

  try {
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { response: { data } };
    }

    alert(data.message);
    signInModal.style.display = "none";
    updateUIWithUsername(data.username); // Replace buttons with username
  } catch (error) {
    console.error(error.response.data);
    alert("Sign-in failed. Try again.");
    submitButton.disabled = true;
  }
});



// // Get the modal, button, close elements
// const modal = document.getElementById("popup-form");
// const rentBtn = document.getElementById("rent-btn");
// // const closeBtn = document.getElementsByClassName("close")[0];

// // Show modal when "Rent Now" button is clicked
// rentBtn.onclick = function () {
//   modal.style.display = "block";
// };

// // Close modal when the 'x' button is clicked
// closeBtn.onclick = function () {
//   modal.style.display = "none";
// };

// // Close modal if user clicks outside the modal content
// window.onclick = function (event) {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// };

// // Form submit handler
// document
//   .getElementById("order-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form from reloading page

//     // Collect form data
//     const pickupAddress = document.getElementById("pickup-address").value;
//     const pickupDate = document.getElementById("pickup-date").value;
//     const returnDate = document.getElementById("return-date").value;

//     // Send fetch POST request to backend
//     fetch("http://localhost:8080/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         pickupAddress: pickupAddress,
//         pickupDate: pickupDate,
//         returnDate: returnDate,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message) {
//           alert("Order placed successfully!");
//         } else {
//           alert("Failed to place the order.");
//         }
//         // Close the modal after submitting
//         modal.style.display = "none";
//       })
//       .catch((error) => {
//         alert("An error occurred while placing the order.");
//         console.error("Error:", error);
//       });
//   });

//////////////////////////////////////////////

// function setupModal1() {
//   const modal = document.getElementById("popup-form1");
//   const rentBtn = document.getElementById("rent-btn1");
//   const closeBtn = document.getElementsByClassName("close1")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form1")
//     .addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent form from reloading page

//       const pickupAddress = document.getElementById("pickup-address1").value;
//       const pickupDate = document.getElementById("pickup-date1").value;
//       const returnDate = document.getElementById("return-date1").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal2() {
//   const modal = document.getElementById("popup-form2");
//   const rentBtn = document.getElementById("rent-btn2");
//   const closeBtn = document.getElementsByClassName("close2")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form2")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const pickupAddress = document.getElementById("pickup-address2").value;
//       const pickupDate = document.getElementById("pickup-date2").value;
//       const returnDate = document.getElementById("return-date2").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal3() {
//   const modal = document.getElementById("popup-form3");
//   const rentBtn = document.getElementById("rent-btn3");
//   const closeBtn = document.getElementsByClassName("close3")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form3")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const pickupAddress = document.getElementById("pickup-address3").value;
//       const pickupDate = document.getElementById("pickup-date3").value;
//       const returnDate = document.getElementById("return-date3").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal4() {
//   const modal = document.getElementById("popup-form4");
//   const rentBtn = document.getElementById("rent-btn4");
//   const closeBtn = document.getElementsByClassName("close4")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form4")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const pickupAddress = document.getElementById("pickup-address4").value;
//       const pickupDate = document.getElementById("pickup-date4").value;
//       const returnDate = document.getElementById("return-date4").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal5() {
//   const modal = document.getElementById("popup-form5");
//   const rentBtn = document.getElementById("rent-btn5");
//   const closeBtn = document.getElementsByClassName("close5")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form5")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const pickupAddress = document.getElementById("pickup-address5").value;
//       const pickupDate = document.getElementById("pickup-date5").value;
//       const returnDate = document.getElementById("return-date5").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal6() {
//   const modal = document.getElementById("popup-form6");
//   const rentBtn = document.getElementById("rent-btn6");
//   const closeBtn = document.getElementsByClassName("close6")[0];

//   // Show modal when "Rent Now" button is clicked
//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   // Close modal when the 'x' button is clicked
//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   // Close modal if user clicks outside the modal content
//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   // Form submit handler
//   document
//     .getElementById("order-form6")
//     .addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent form from reloading page

//       // Collect form data
//       const pickupAddress = document.getElementById("pickup-address6").value;
//       const pickupDate = document.getElementById("pickup-date6").value;
//       const returnDate = document.getElementById("return-date6").value;

//       // Send fetch POST request to backend
//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           // Close the modal after submitting
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal7() {
//   const modal = document.getElementById("popup-form7");
//   const rentBtn = document.getElementById("rent-btn7");
//   const closeBtn = document.getElementsByClassName("close7")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form7")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const pickupAddress = document.getElementById("pickup-address7").value;
//       const pickupDate = document.getElementById("pickup-date7").value;
//       const returnDate = document.getElementById("return-date7").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

// function setupModal8() {
//   const modal = document.getElementById("popup-form8");
//   const rentBtn = document.getElementById("rent-btn8");
//   const closeBtn = document.getElementsByClassName("close8")[0];

//   rentBtn.onclick = function () {
//     modal.style.display = "block";
//   };

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   document
//     .getElementById("order-form8")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const pickupAddress = document.getElementById("pickup-address8").value;
//       const pickupDate = document.getElementById("pickup-date8").value;
//       const returnDate = document.getElementById("return-date8").value;

//       fetch("http://localhost:8080/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pickupAddress: pickupAddress,
//           pickupDate: pickupDate,
//           returnDate: returnDate,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             alert("Order placed successfully!");
//           } else {
//             alert("Failed to place the order.");
//           }
//           modal.style.display = "none";
//         })
//         .catch((error) => {
//           alert("An error occurred while placing the order.");
//           console.error("Error:", error);
//         });
//     });
// }

function setupModal1() {
  const modal = document.getElementById("popup-form1");
  const rentBtn = document.getElementById("rent-btn1");
  const closeBtn = document.getElementsByClassName("close1")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form1")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model1").value;
      const mobile = document.getElementById("mobile1").value;
      const pickupAddress = document.getElementById("pickup-address1").value;
      const pickupDate = document.getElementById("pickup-date1").value;
      const returnDate = document.getElementById("return-date1").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal2() {
  const modal = document.getElementById("popup-form2");
  const rentBtn = document.getElementById("rent-btn2");
  const closeBtn = document.getElementsByClassName("close2")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form2")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model2").value;
      const mobile = document.getElementById("mobile2").value;
      const pickupAddress = document.getElementById("pickup-address2").value;
      const pickupDate = document.getElementById("pickup-date2").value;
      const returnDate = document.getElementById("return-date2").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal3() {
  const modal = document.getElementById("popup-form3");
  const rentBtn = document.getElementById("rent-btn3");
  const closeBtn = document.getElementsByClassName("close3")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form3")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model3").value;
      const mobile = document.getElementById("mobile3").value;
      const pickupAddress = document.getElementById("pickup-address3").value;
      const pickupDate = document.getElementById("pickup-date3").value;
      const returnDate = document.getElementById("return-date3").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal4() {
  const modal = document.getElementById("popup-form4");
  const rentBtn = document.getElementById("rent-btn4");
  const closeBtn = document.getElementsByClassName("close4")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form4")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model4").value;
      const mobile = document.getElementById("mobile4").value;
      const pickupAddress = document.getElementById("pickup-address4").value;
      const pickupDate = document.getElementById("pickup-date4").value;
      const returnDate = document.getElementById("return-date4").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal5() {
  const modal = document.getElementById("popup-form5");
  const rentBtn = document.getElementById("rent-btn5");
  const closeBtn = document.getElementsByClassName("close5")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form5")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model5").value;
      const mobile = document.getElementById("mobile5").value;
      const pickupAddress = document.getElementById("pickup-address5").value;
      const pickupDate = document.getElementById("pickup-date5").value;
      const returnDate = document.getElementById("return-date5").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal6() {
  const modal = document.getElementById("popup-form6");
  const rentBtn = document.getElementById("rent-btn6");
  const closeBtn = document.getElementsByClassName("close6")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form6")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model6").value;
      const mobile = document.getElementById("mobile6").value;
      const pickupAddress = document.getElementById("pickup-address6").value;
      const pickupDate = document.getElementById("pickup-date6").value;
      const returnDate = document.getElementById("return-date6").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal7() {
  const modal = document.getElementById("popup-form7");
  const rentBtn = document.getElementById("rent-btn7");
  const closeBtn = document.getElementsByClassName("close7")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form7")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model7").value;
      const mobile = document.getElementById("mobile7").value;
      const pickupAddress = document.getElementById("pickup-address7").value;
      const pickupDate = document.getElementById("pickup-date7").value;
      const returnDate = document.getElementById("return-date7").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

function setupModal8() {
  const modal = document.getElementById("popup-form8");
  const rentBtn = document.getElementById("rent-btn8");
  const closeBtn = document.getElementsByClassName("close8")[0];

  // Show modal when "Rent Now" button is clicked
  rentBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when the 'x' button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal if user clicks outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Form submit handler
  document
    .getElementById("order-form8")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading page

      // Collect form data
      const vehicleModel = document.getElementById("vehicle-model8").value;
      const mobile = document.getElementById("mobile8").value;
      const pickupAddress = document.getElementById("pickup-address8").value;
      const pickupDate = document.getElementById("pickup-date8").value;
      const returnDate = document.getElementById("return-date8").value;

      // Send fetch POST request to backend
      fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModel: vehicleModel,
          mobile: mobile,
          pickupAddress: pickupAddress,
          pickupDate: pickupDate,
          returnDate: returnDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Order placed successfully!");
          } else {
            alert("Failed to place the order.");
          }
          // Close the modal after submitting
          modal.style.display = "none";
        })
        .catch((error) => {
          alert("An error occurred while placing the order.");
          console.error("Error:", error);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  setupModal1();
  setupModal2();
  setupModal3();
  setupModal4();
  setupModal5();
  setupModal6();
  setupModal7();
  setupModal8();
});

//////////////////////////////////////////////

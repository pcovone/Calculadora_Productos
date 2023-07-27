(function () {
  emailjs.init("OheQdJStKuMccOfYe");
})();

const formData = {} || JSON.parse(localStorage.getItem("form"));

const datos = {
  nombre: nombre,
  apellido: apellido,
  correo: correo,
  id: id,
  direccion: direccion,
};

const inputs = document.querySelectorAll("input");

inputs.forEach((el) => {
  el.addEventListener("input", (e) => {
    if (e.target.name) {
      formData[e.target.name] = e.target.value;
    }
    localStorage.setItem("form", JSON.stringify(formData));
  });
});

function enviarCorreo(formData) {
  swal(
    "Gracias por tu compra!",
    "Te llegará un email con tu número de referencia",
    "success"
  );
  const { nombre, correo } = formData;

  emailjs
    .send("service_a9s857p", "template_e1kdj6o", {
      from_name: "Tempo Treasure",
      message: "Tu número de referencia es: 00021.",
      email_id: correo,
      send_to: correo,
      to_name: nombre,
    })
    .then((response) => {
      console.log("El correo se ha enviado correctamente:", response);
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
}

const buttonMail = document.querySelector("#btn-comprar");

buttonMail.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Enviando correo...");

  const correoInput = document.getElementById("correo");
  if (correoInput.value === "") {
    console.error("El campo de correo electrónico está vacío.");
    return;
  }
  enviarCorreo(formData);
});

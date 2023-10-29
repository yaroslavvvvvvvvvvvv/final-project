<template>
  <div class="register">
    <h1 class="logBox">Регистрация</h1>
    <input
      v-model="username"
      placeholder="Никнейм"
      class="logBox"
      style="border-style: solid; border-radius: 3px"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Пароль"
      class="logBox"
      @keydown.enter="register"
      style="border-style: solid; border-radius: 3px"
    />
    <button
      @click="register"
      class="logBox"
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      "
    >
      Зарегистрироваться
    </button>
    <router-link
      :to="{ name: 'login' }"
      class="logBox"
      style="text-decoration: none; color: black"
      >Есть аккаунт? 
      Войдите</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      if (this.username === "" || this.password === "") {
        alert("Заполните все поля");
      } else {
        axios
          .post("http://localhost:4004/api/register", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            if (response.data === "Это имя уже занято") {
              alert("Это имя уже занято");
            } else {
              if (response.data === "Не удалось зарегистрироваться") {
                alert(response.data);
              } else {
                alert(response.data);
                this.$router.push("/");
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userName", this.username);
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
.register {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-self: center;
  margin: 15%;
  align-items: center;
}

.logBox {
  margin: 1%;
}

.logBox::-webkit-input-placeholder {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.logBox:-ms-input-placeholder {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.logBox:-moz-placeholder {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.logBox::-moz-placeholder {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>

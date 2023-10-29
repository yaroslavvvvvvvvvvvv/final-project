<template>
  <div class="login">
    <h1 class="logBox">Вход</h1>
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
      @keydown.enter="login"
      style="border-style: solid; border-radius: 3px"
    />
    <button
      @click="login"
      class="logBox"
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      "
    >
      Войти
    </button>
    <router-link
      :to="{ name: 'register' }"
      class="logBox"
      style="text-decoration: none; color: black"
      >Нет аккаунта? 
      Зарегистрируйтесь</router-link
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
    login() {
      if (this.username === "" || this.password === "") {
        alert("Заполните все поля");
      } else {
        axios
          .post("http://localhost:4004/api/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            if (response.data === "Не получилось войти") {
              alert(response.data);
            } else {
              alert("Вход выполнен");
              this.$router.push("/");
              localStorage.setItem("loggedIn", "true");
              localStorage.setItem("userName", this.username);
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

<style scoped>
.login {
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

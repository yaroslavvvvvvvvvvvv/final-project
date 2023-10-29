<template style="margin: 0">
  <header style="background-color: burlywood; padding: 0; margin: 0">
    <button @click="logOut" style="margin: 1%">Выход</button>
  </header>
  <div class="chat">
    <div class="chatBox">
      <div
        v-for="message in messages"
        :key="message.timestamp"
        class="message-container"
      >
        <p class="logBox">
          <strong>{{ message.user }} в {{ message.timestamp }}:</strong>
          {{ message.message }}
        </p>
      </div>
    </div>
    <input
      v-model="newMessage"
      @keydown.enter="sendMessage"
      placeholder="Ваше сообщение..."
      class="logBox"
      style="border-style: solid; border-color: black; border-radius: 3px"
    />
    <button @click="sendMessage" class="logBox" style="">Отправить</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  created() {
    if (localStorage.getItem("loggedIn") !== "true") {
      this.$router.push({ name: "login" });
    } else {
      this.fetchMessages();
    }
  },
  methods: {
    logOut() {
      this.$router.push({ name: "login" });
      localStorage.removeItem("userName");
      localStorage.setItem("loggedIn", "false");
    },

    sendMessage() {
      const user = localStorage.getItem("userName");
      const message = this.newMessage;

      axios
        .post("http://localhost:4004/api/send-message", { user, message })
        .then(() => {
          this.newMessage = "";
          this.fetchMessages();
        })
        .catch((error) => {
          console.error(error);
          alert("Не получилось отправить сообщение");
        });
    },
    fetchMessages() {
      axios
        .get("http://localhost:4004/api/get-messages")
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.error(error);
          alert("Не получилось загрузить сообщения");
        });
    },
  },
};
</script>

<style>
.chatBox {
  background-color: white;
  max-width: 100%;
  overflow-x: hidden;
  padding: 1%;
  border-style: solid;
  border-color: black;
  border-radius: 3px;
}
.chat {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 15%;
  align-items: center;
  justify-self: center;
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
.message-container {
  word-wrap: break-word;
  max-width: 80%;
  margin: 1%;
}
</style>

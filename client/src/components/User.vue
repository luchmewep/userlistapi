<template>
  <div class="user">
    <div id="user-crud" class="contai">
      <div class="row">
        <div class="col-md-5 mx-auto">
          <h1 class="text-center mb-3">ADD USER</h1>
          <form @submit.prevent="addNewUser">
            <label for="firstName">First Name:</label>
            <input v-model="firstName" type="text" id="firstName" class="form-control">
            <label for="lastName">Last Name:</label>
            <input v-model="lastName" type="text" id="lastName" class="form-control">
            <label for="userName">Username:</label>
            <input v-model="userName" type="text" id="userName" class="form-control">
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" class="form-control">
            <label for="password2">Confirm Password:</label>
            <input v-model="password2" type="password" id="password2" class="form-control">
            <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
              ADD USER
            </button>
            <button v-else @click="updateUser" type="button" class="btn btn-success btn-block mt-3">
              UPDATE USER
            </button>
          </form>

          
        </div>
        <div class="col-md-5 mx-auto">
          <h1 class="text-center mb-3">LIST OF USERS</h1>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-left">Firstname</th>
                <th class="text-left">Lastname</th>
                <th class="text-left">Username</th>
                <th class="text-left">Password</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tr v-for="user in users" :key="user.uid" :title="user.firstName">
              <td class="text-left">{{ user.firstName }}</td>
              <td class="text-left">{{ user.lastName }}</td>
              <td class="text-left">{{ user.userName }}</td>
              <td class="text-left">{{ user.password }}</td>
              <td class="text-right">
                <button class="btn btn-info" @click="editUser(user.uid)">EDIT</button>
                <button class="btn btn-danger" @click="deleteUser(user.uid)">DELETE</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { log } from 'util'

export default {
  name: 'User',
  data () {
    return {
      users: [],
      oneUser: {},
      uid: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      password2: '',
      isEdit: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      axios.get('/api/users').then(
        result => {
          this.users = result.data
        }
      )
    },
    addNewUser() {
      axios.post('/api/users', 
        {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          password: this.password
        }
      ).then((res) => {
        this.firstName = '',
        this.lastName = '',
        this.userName = '',
        this.password = '',
        this.password2 = '',
        this.getUsers()
      }).catch((err) => {
        console.log(err)
      })
    },
    editUser(id) {
      if(!this.users){
        return []
      }
      return this.users.filter((user) => {
        if(user.uid == id) {
          this.uid = user.uid
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.userName = user.userName
          this.isEdit = true
        } 
      })
    },
    updateUser() {
      axios.put(`/api/users/${this.uid}`, 
        {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          password: this.password
        }
      ).then((res) => {
        this.firstName = '',
        this.lastName = '',
        this.userName = '',
        this.password = '',
        this.password2 = '',
        this.getUsers()
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteUser(id) {
      axios.delete(`/api/users/${id}`)
      .then((res) => {
        this.firstName = '',
        this.lastName = '',
        this.userName = '',
        this.password = '',
        this.password2 = '',
        this.getUsers()
      }).catch((err) => {
        console.log(err)
      })
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

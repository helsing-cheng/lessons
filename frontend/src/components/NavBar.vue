<template>
  <el-header style="display:flex; justify-content:space-between; align-items:center;">
    <div>Teaching App</div>
    <div>
      <el-button type="text" @click="goHome">Home</el-button>
      <el-button v-if="!user" type="primary" @click="toLogin">Login</el-button>
      <el-dropdown v-else>
        <span class="el-dropdown-link">{{ user.username }}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUser } from '../store/user';
import { computed } from 'vue';
const router = useRouter();
const store = useUser();
const user = computed(() => store.user);
function toLogin(){ router.push('/login'); }
function goHome(){ router.push('/'); }
function logout(){ store.logout(); router.push('/'); }
</script>

<style scoped>
.el-header { padding: 10px 20px; background:#f5f7fa; }
</style>

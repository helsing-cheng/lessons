<template>
  <div style="max-width:420px;margin:40px auto;">
    <el-card>
      <h3>登录 / 注册（示例）</h3>
      <el-form :model="form" label-width="80px">
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import http from '../api/http';
import { useUser } from '../store/user';
import { useRouter } from 'vue-router';
const store = useUser();
const router = useRouter();
const form = reactive({ email: '', password: '' });

async function login(){
  try{
    const res = await http.post('/auth/login', { email: form.email, password: form.password });
    store.setUser(res.data.user, res.data.token);
    router.push('/');
  }catch(e){
    alert(e?.response?.data?.message || '登录失败');
  }
}

async function register(){
  try{
    const res = await http.post('/auth/register', { username: form.email.split('@')[0], email: form.email, password: form.password });
    alert('注册成功，请登录');
  }catch(e){
    alert(e?.response?.data?.message || '注册失败');
  }
}
</script>

<template>
  <div style="padding:20px;">
    <el-card>
      <h3>课程列表</h3>
      <el-table :data="courses" style="width:100%">
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="teacher.username" label="教师" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import http from '../api/http';
const courses = ref([]);
async function load(){
  try {
    const res = await http.get('/courses');
    courses.value = res.data;
  } catch(e){
    console.error(e);
  }
}
onMounted(load);
</script>

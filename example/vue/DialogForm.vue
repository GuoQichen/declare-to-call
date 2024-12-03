<script lang="ts" setup>
import { defineProps, reactive } from 'vue'

defineProps(['onResolve', 'onReject', 'title'])

const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>

<template>
  <el-dialog
    :model-value="true"
    :title="title"
    width="500"
    @closed="() => onReject(null)"
  >
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="() => onReject(null)">
          Cancel
        </el-button>
        <el-button type="primary" @click="() => onResolve(form)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

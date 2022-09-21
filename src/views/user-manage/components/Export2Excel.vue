<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input :placeholder="$t('msg.excel.placeholder')" v-model="defaultName"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
const defaultName = ref(i18n.t('msg.excel.defaultName'))

const onConfirm = () => {
  // TODO: 业务
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}
</script>
<style>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>

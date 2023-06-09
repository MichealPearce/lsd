<script lang="ts">
import { useAsync } from 'client/includes/useAsync'
import { useReports } from 'client/stores/reports'
import { computed, defineComponent, onBeforeMount, useAttrs, watch } from 'vue'

export default defineComponent({
	name: 'ReportsSinglePage',
	inheritAttrs: false,
})
</script>

<script setup lang="ts">
const attrs = useAttrs()
const reports = useReports()
const props = defineProps<{
	id: string
}>()

const reportID = computed(() => props.id)

const isRedacted = computed(() => {
	if (!fetch.result) return false
	return !!fetch.result.deleted
})

const fetch = useAsync(async () => {
	const reportID = parseInt(props.id)
	return await reports.fetch(reportID)
})

watch(reportID, fetch.trigger, { immediate: true })
</script>

<template>
	<ConstructPage
		v-if="fetch.error || isRedacted"
		class="reports-single-page error"
	>
		<h1 v-if="fetch.error">[Report not found]</h1>
		<h1 v-else>[Report Redacted]</h1>
	</ConstructPage>
	<ReportProvider
		v-else-if="fetch.result"
		:item="fetch.result"
	>
		<RouterView
			:key="props.id"
			v-bind="attrs"
		/>
	</ReportProvider>
</template>

<style lang="scss" scoped>
.reports-single-page.error {
	@include flex(column);
	justify-content: center;
	align-items: center;
}
</style>

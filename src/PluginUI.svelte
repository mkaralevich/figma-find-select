<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';

	import { Button, Input, Checkbox, Type, Label, SelectMenu } from 'figma-plugin-ds-svelte';

	let pattern = ""
	let isSelected = false

	function selectPattern() {
		parent.postMessage({
			pluginMessage: {
				'type': 'select-pattern',
				'pattern': pattern,
				'isSelected': isSelected
			}
		}, '*');
	}
	function unstyleEls() {
		parent.postMessage({
			pluginMessage: {
				'type': 'unstyle-elements',
			}
		}, '*');
	}

	function cancel() {
		parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
	}

</script>

<style>
	.width-full {
		width: 100%;
	}
</style>

<div class="wrapper p-xxsmall">

	<div class="mb-xsmall mt-xsmall">
		<Type size="xsmall" weight="bold">Select pattern</Type>
	</div>
	<div class="flex justify-content-between width-full">
		<Input placeholder="Enter pattern..." bind:value={pattern} class="mb-xxsmall width-full" />
		<Button on:click={selectPattern} class="mr-xsmall">Select</Button>
	</div>

</div>
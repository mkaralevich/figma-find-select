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
	.flex-grow {
		flex-grow: 1;
	}

	.flex-gap {
		gap: 8px
	}
</style>

<div class="wrapper p-xsmall">

	<div class="mb-xsmall flex-grow">
		<Type size="xsmall" weight="bold">Find layers</Type>
	</div>

	<div class="flex justify-content-between flex-gap ">
		<Input placeholder="Enter pattern..." bind:value={pattern} class="mb-xxsmall flex-grow" />
		<Button on:click={selectPattern}>Select</Button>
	</div>

</div>
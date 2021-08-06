figma.showUI(__html__, { width: 320, height: 96 });

figma.ui.onmessage = (msg) => {
	const selection = [...figma.currentPage.selection];
	if (selection.length === 0) return figma.notify(`Please select layers first`);
	let acc = [];

	const findPattern = (arr) => {
		if (arr && arr.length > 0) {
			arr.map((node) => {
				if (node.name.match(msg.pattern)) {
					acc = [...acc, node];
				}
				if (node.children) {
					node.children.map((child) => {
						if (child.name.match(msg.pattern)) {
							acc = [...acc, child];
						}
						findPattern(child.children);
					});
				}
			});
		}
	};
	findPattern(selection);
	figma.currentPage.selection = acc;
	const postMessage = () => {
		if (acc.length === 0) return figma.notify(`Nothing found`);
		if (acc.length > 0) return figma.notify(`✓ Selected ${acc.length} layers`);
	};
	postMessage();
	figma.closePlugin();
};

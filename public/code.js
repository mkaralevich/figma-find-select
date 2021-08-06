'use strict';

figma.showUI(__html__, { width: 320, height: 96 });
figma.ui.onmessage = (msg) => {
    const selection = [...figma.currentPage.selection];
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
    figma.closePlugin();
};

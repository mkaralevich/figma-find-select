'use strict';

figma.showUI(__html__, { width: 320 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "select-pattern") {
        if (msg.isSelected) {
            const selection = [...figma.currentPage.selection];
            const findPattern = (arr) => {
                return arr.filter((node) => {
                    if (node.name.match(msg.pattern))
                        return true;
                    if (node.children) {
                        node.children.filter((child) => {
                            if (child.name.match(msg.pattern))
                                return true;
                            findPattern(child.children);
                        });
                    }
                });
            };
            const found = [...findPattern(selection)];
            figma.currentPage.selection = found;
        }
        figma.closePlugin();
    }
    if (!msg.isSelected) {
        const found = figma.currentPage.findAll((n) => {
            if (n.name.match(msg.pattern))
                return true;
        });
        figma.currentPage.selection = found;
    }
    figma.closePlugin();
};

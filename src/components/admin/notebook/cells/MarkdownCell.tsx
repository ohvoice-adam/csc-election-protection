import React from 'react';
interface MarkdownCellProps {
  content: string;
}
const MarkdownCell: React.FC<MarkdownCellProps> = ({
  content
}) => {
  // Simple markdown renderer (in a real app, you'd use a proper markdown library)
  const renderMarkdown = (text: string) => {
    // Replace headers
    let html = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2 mt-3">$1</h3>');
    // Replace lists
    html = html.replace(/^\- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>');
    // Replace paragraphs
    html = html.replace(/^(?!<h|<li)(.*$)/gm, match => {
      if (match.trim() === '') return '<br />';
      return `<p class="mb-2">${match}</p>`;
    });
    // Wrap lists
    html = html.replace(/<li class="ml-4 list-disc">(.*?)<\/li>\n<li class="ml-4 list-disc">/g, '<li class="ml-4 list-disc">$1</li>\n<li class="ml-4 list-disc">');
    html = html.replace(/<li class="ml-4 list-disc">(.*?)<\/li>\n(?!<li)/g, '<li class="ml-4 list-disc">$1</li></ul>\n');
    html = html.replace(/(?<!<\/ul>\n)(<li class="ml-4 list-disc">)/g, '<ul class="mb-4">$1');
    return html;
  };
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{
    __html: renderMarkdown(content)
  }} />;
};
export default MarkdownCell;
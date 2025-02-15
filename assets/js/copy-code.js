const copyButtonLabel = 'copy code';

// Select only <pre> elements that have a <code> child
let blocks = document.querySelectorAll("pre:has(code)");

blocks.forEach((block) => {
  let parentDiv = block.parentElement; // Get the parent <div>
  
  // Only add button if browser supports Clipboard API and the parent exists
  if (navigator.clipboard && parentDiv) {
    let button = document.createElement("button");

    button.innerText = copyButtonLabel;
    parentDiv.appendChild(button); // Append the button to the <div>, not <pre>

    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText.trim(); // Remove leading/trailing spaces

  // If a $ is present, only copy the part after the first $
  let copiedText = text.includes("$") ? text.split("$").slice(1).join("$").trim() : text;

  await navigator.clipboard.writeText(copiedText);

  // Visual feedback that task is completed
  button.innerText = "code copied!";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 1500);
}


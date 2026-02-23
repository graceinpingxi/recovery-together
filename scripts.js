function postMessage() {
    const input = document.getElementById('messageInput');
    const board = document.getElementById('messageBoard');

    if (input.value.trim() === "") {
        alert("請輸入內容！");
        return;
    }

    // Create a new message card
    const card = document.createElement('div');
    card.className = 'message-card';
    card.innerText = input.value;

    // Add to board
    board.prepend(card);

    // Clear input
    input.value = "";
}

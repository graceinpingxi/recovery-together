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
// --- A. 發佈訊息 (包含暱稱) ---
  window.postMessage = async function() {
    const nicknameInput = document.getElementById('nicknameInput');
    const messageInput = document.getElementById('messageInput');
    
    const nickname = nicknameInput.value.trim() || "匿名夥伴"; // 如果沒填就顯示匿名
    const text = messageInput.value.trim();

    if (text === "") {
        alert("請輸入內容！");
        return;
    }

    try {
        await addDoc(messagesCol, {
            nickname: nickname, // 存入暱稱
            text: text,
            createdAt: serverTimestamp()
        });
        messageInput.value = ""; // 只清空訊息框，保留暱稱方便連續發言
    } catch (e) {
        console.error("發布失敗: ", e);
    }
  };

  // --- B. 顯示訊息 (包含暱稱) ---
  const q = query(messagesCol, orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const board = document.getElementById('messageBoard');
    board.innerHTML = ""; 
    
    snapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = 'message-card';

        let timeString = "傳送中...";
        if (data.createdAt) {
            const date = data.createdAt.toDate();
            timeString = date.toLocaleString('zh-TW', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }

        // 在卡片中組合：暱稱、內容、時間
        card.innerHTML = `
            <div class="message-header">
                <span class="message-nickname">${data.nickname || "匿名夥伴"}</span>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-text">${data.text}</div>
        `;
        board.appendChild(card);
    });

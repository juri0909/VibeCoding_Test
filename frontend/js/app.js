// app.js

const API_BASE = window.location.origin; // 로컬 및 배포 환경 공용

document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const convertBtn = document.getElementById("convertBtn");
    const copyBtn = document.getElementById("copyBtn");
    const targetBtns = document.querySelectorAll(".target-btn");
    const loadingOverlay = document.getElementById("loadingOverlay");

    let selectedTarget = null;

    // 수신 대상 버튼 클릭 이벤트
    targetBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            targetBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedTarget = btn.dataset.target;
        });
    });

    // 변환하기 버튼 클릭 이벤트
    convertBtn.addEventListener("click", async () => {
        const text = inputText.value.trim();

        if (!text) {
            alert("변환할 내용을 입력해주세요.");
            return;
        }

        if (!selectedTarget) {
            alert("수신 대상을 선택해주세요.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/api/convert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text,
                    target_audience: selectedTarget
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "변환 중 오류가 발생했습니다.");
            }

            const data = await response.json();
            outputText.value = data.converted_text;
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    });

    // 복사하기 버튼 클릭 이벤트
    copyBtn.addEventListener("click", () => {
        const text = outputText.value;
        if (!text) {
            alert("복사할 내용이 없습니다.");
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "복사 완료!";
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        }).catch(err => {
            console.error("복사 실패:", err);
            alert("복사에 실패했습니다.");
        });
    });

    function setLoading(isLoading) {
        if (isLoading) {
            loadingOverlay.classList.remove("hidden");
            convertBtn.disabled = true;
            convertBtn.innerText = "처리 중...";
        } else {
            loadingOverlay.classList.add("hidden");
            convertBtn.disabled = false;
            convertBtn.innerText = "변환하기";
        }
    }
});

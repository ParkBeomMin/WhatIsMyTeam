<template>
    <div class="page-container">
        <h1>문의하기</h1>
        <div class="content">
            <section>
                <h2>문의 방법</h2>
                <p>서비스 이용에 관한 문의사항이 있으시다면 아래 방법으로 연락 주시기 바랍니다:</p>
                <ul>
                    <li>이메일: whatismyteam@gmail.com</li>
                    <li>트위터: <a href="https://twitter.com/whatismyteam" target="_blank">@whatismyteam</a></li>
                </ul>
            </section>
            
            <section>
                <h2>응답 시간</h2>
                <p>문의하신 내용은 영업일 기준 2-3일 내에 답변드리도록 하겠습니다.</p>
            </section>
        </div>
    </div>
</template>

<style scoped>
.page-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

section {
    margin-bottom: 30px;
}

h2 {
    color: #bd55b6;
    font-size: 1.2rem;
    margin-bottom: 15px;
}

p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    color: #666;
    margin-bottom: 10px;
}

a {
    color: #bd55b6;
    text-decoration: none;
    transition: color 0.2s;
}

a:hover {
    color: #b82cae;
}
</style> 
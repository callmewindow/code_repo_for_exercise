// 最普通的双指针方法
function isSubsequence(s: string, t: string): boolean {
    // 双指针，判断s能否在t中被按顺序显示
    let sI = 0;
    for(let i = 0;i<t.length;i++){
        if(t[i] == s[sI]) sI++;
    }
    return sI == s.length;
};

// 动态规划，最长公共子字符串
function isSubsequence(s: string, t: string): boolean {
    // 动态规划，最长公共子字符串
    let sL = s.length;
    let tL = t.length;
    if(sL > tL) return false;
    // dp记录s中前i个字符和t中前j个字符中的公共子字符串长度
    let dp = new Array(sL+1);
    for(let i = 0;i<=sL;i++){
        // 初始化为0，边界值
        dp[i] = new Array(tL+1).fill(0);
    }
    for(let i = 1;i<=sL;i++){
        for(let j = 1;j<=tL;j++){
            if(s[i-1] == t[j-1]){
                // 相等表示公共子字符串长度多了一个，都前进
                dp[i][j] = dp[i-1][j-1] + 1;
            }else{
                // 不相等，所以dp的长度没变，等于上一个，但还是要往前走，所以s不变
                dp[i][j] = dp[i][j-1];
            }
        }
    }
    return dp[sL][tL] == sL;
};
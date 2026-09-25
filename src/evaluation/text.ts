// Match words after ignoring case, diacritics, punctuation and whitespace.
// LCS retains sequence, including repeated words, for useful local feedback.
export function words(text:string){return text.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('pt-BR').match(/[\p{L}\p{N}]+/gu)??[]}
export function compareText(expected:string,answer:string){
 const a=words(expected),b=words(answer),dp=Array.from({length:a.length+1},()=>Array<number>(b.length+1).fill(0));
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
 const missing:string[]=[],extra:string[]=[];let i=0,j=0;
 while(i<a.length||j<b.length){if(i<a.length&&j<b.length&&a[i]===b[j]){i++;j++}else if(i<a.length&&(j===b.length||dp[i+1][j]>=dp[i][j+1]))missing.push(a[i++]);else extra.push(b[j++])}
 return {correct:missing.length===0&&extra.length===0,missing,extra};
}

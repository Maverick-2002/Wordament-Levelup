mergeInto(LibraryManager.library, {
  // Fetch words from Firebase
  FetchWordsFromFirebase: function() {

    //DB Reference...
  const db = firebase.firestore();

    // Fetch words from the wordlist collection
    db.collection("wordlist").doc("Testing").get().then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
        var wordsArray = await doc.data(); // Fetch words
        SendMessage('WordHunt', 'OnWordsReceived', JSON.stringify(wordsArray));
      }
    }).catch((error) => {
      console.error("Error fetching words:", error);
    });
  },

  // Fetch game results from Firebase
  FetchGameResultsFromFirebase: async function() {

    //DB Reference...
  const db = firebase.firestore();

     //Gets MQ UserId from URL Search Params
    const searchParams=new URLSearchParams(window.location.search)
    const userId=searchParams.get("MQ_USER");

 const user=await db.collection("UserInfo").doc(userId).get();

if(user.exists){
  const userData=user.data();
     SendMessage('WordHunt', 'OnGameResultsReceived', JSON.stringify({Name:userData.Name,id:userData.id,Time:userData.Time}));
  return
}
  const userAPIResponse=await (await fetch(`https://metaqube-auth.el.r.appspot.com/user/getUserData?uid=${userId}`)).json()
    const userData=userAPIResponse.data;
     SendMessage('WordHunt', 'OnGameResultsReceived', JSON.stringify({Name:userData.name,id:userData._id,Time:"0"}));
  },
  // Fetch game results from Firebase
  CreateGameResultsFromFirebase: async function(data) {
        //DB Reference...
  const db = firebase.firestore();

  const parsedData=Pointer_stringify(data)
  const { Name,
  id,
  Time}=JSON.parse(parsedData)
   const user=await db.collection("UserInfo").doc(id).get();
if(user.exists){
  const userData=await user.ref.update({
    Time:Number(Time)
  });
  return
}
await db.collection("UserInfo").doc(id).set({
  Name,
  id,
  Time:Number(Time)
})
  },

   FetchAllWordsFromFirebase: async function() {
    // DB Reference
    const db = firebase.firestore();

    // Fetch all documents from the wordlist collection
   const querySnapshot = await db.collection("UserInfo").orderBy("Time").get()
     const wordsArray= querySnapshot.docs.map((doc) =>doc.data() );
     console.log(wordsArray)
    SendMessage('WordHunt', 'OnAllUserInfoReceived', JSON.stringify({data:wordsArray}));

  },

});
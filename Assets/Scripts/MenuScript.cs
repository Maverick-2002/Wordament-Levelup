using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using UnityEngine.SceneManagement;
using static WordHunt;

public class MenuScript : MonoBehaviour {

    private CanvasGroup canvas;
    public static MenuScript instance;
    public Transform miniMenu;

    private void Awake()
    {
        instance = this;
    }
    private void Start()
    {
        canvas = GetComponent<CanvasGroup>();
        canvas.alpha = 1;     
    }
    public void StartGame(){
        canvas.alpha = 0;
        canvas.blocksRaycasts = false;
        miniMenu.DOMoveY(0,.6f).SetEase(Ease.OutBack);
    }
    public void Home()
    {
        QuizScroll.instance.ResetQuizScroll();
        ScrollViewWords.instance.ResetQuizScroll();
        WordHunt.instance.ClearWords();
        WordDataStore.CategoryWordMap.Clear();
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}

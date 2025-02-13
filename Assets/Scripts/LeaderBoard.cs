using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class LeaderBoard : MonoBehaviour
{
    public static LeaderBoard instance;
    private RectTransform rect;
    public GameObject wordCellPrefab;
    public Transform scrollViewContent;
    private void Awake()
    {
        instance = this;
    }
    public void ResetLeaderBoard()
    {
        // Destroy all spawned quiz cells
        foreach (Transform child in scrollViewContent)
        {
            Destroy(child.gameObject);
        }
    }
    public void SpawnLeaderBoard(string name, int pos , string time , float delay)
    {
        GameObject cell = Instantiate(wordCellPrefab, scrollViewContent);
        Text[] textComponents = cell.GetComponentsInChildren<Text>();
        textComponents[0].text = pos.ToString();
        textComponents[1].text = name;
        float time2 = float.Parse(time);
        textComponents[2].text = time2.ToString("F2");
        cell.transform.DOScale(0, 0.3f).SetEase(Ease.OutBack).From().SetDelay(delay);
    }
}

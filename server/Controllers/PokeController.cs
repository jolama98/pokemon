// [Authorize]
using System.Net.Http;
using System.Text;
using Microsoft.AspNetCore.Http;

[ApiController]
[Route("api/[controller]")]
public class pokeController : ControllerBase
{

    private string baseUrl = "https://pokeapi.co/api/v2/pokemon";

    [HttpGet]
    public async Task<ActionResult> GetAllPokesAsync()
    {
        try
        {
            string query = HttpContext.Request.QueryString.ToString();

            string url = baseUrl + query;

            HttpClient client = new HttpClient();
            client
                .DefaultRequestHeaders
                .Accept
                .Add(
                    new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json")
                    );


            HttpResponseMessage response = await client.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest($"Failed to fetch data from the API. Status Code: {response.StatusCode}");
            }

            string responseString = await response.Content.ReadAsStringAsync();

            return Ok(responseString);
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

}
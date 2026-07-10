import json
from urllib.parse import parse_qs

def handler(event, context):
    # Parse query parameters from URL
    query_params = event.get("queryStringParameters", {})
    try:
        free_hours = int(query_params.get("hours", 4))
        stress_level = int(query_params.get("stress", 5))
    except ValueError:
        free_hours = 4
        stress_level = 5

    schedule = []
    
    # Adjust logic based on stress levels
    if stress_level >= 7:
        mode = "De-stress & Light Review"
        # High stress: 30 mins break for every 30 mins study
        slots = free_hours * 2
        for i in range(slots):
            if i % 2 == 0:
                schedule.append({"time": f"Slot {i+1}", "activity": "Light Revision / Reading"})
            else:
                schedule.append({"time": f"Slot {i+1}", "activity": "Relaxing Break (Walk, Music, Hydrate)"})
    else:
        mode = "Productive Focus"
        # Normal stress: 45 mins study, 15 mins break
        for i in range(free_hours):
            schedule.append({"time": f"Hour {i+1} (First 45m)", "activity": "Deep Focus Study Session"})
            schedule.append({"time": f"Hour {i+1} (Last 15m)", "activity": "Short Reset Break"})

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "mode": mode,
            "stress_level": stress_level,
            "schedule": schedule
        })
    }
USERNAME="NickScherbakov"
PAGE=1
TOTAL_STARS=0

while : ; do
  # Получаем репозитории постранично, извлекаем количество звезд и суммируем
  STARS_ON_PAGE=$(curl -s "https://api.github.com/users/$USERNAME/repos?per_page=100&page=$PAGE" | jq '[.[] | select(.fork == false) | .stargazers_count] | add')
  
  # Если на странице нет репозиториев или звезд, выходим из цикла
  if [ -z "$STARS_ON_PAGE" ] || [ "$STARS_ON_PAGE" = "null" ]; then
    break
  fi
  
  TOTAL_STARS=$((TOTAL_STARS + STARS_ON_PAGE))
  echo "Страница $PAGE: найдено $STARS_ON_PAGE звезд..."
  PAGE=$((PAGE + 1))
done

echo "-----------------------------------"
echo "Общее количество звезд: $TOTAL_STARS"
echo "-----------------------------------"

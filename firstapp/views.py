# from django.shortcuts import render
# from .models import Song
# from django.core.paginator import Paginator
#
# def index(request):
#     paginater= Paginator(Song.objects.all(),1)
#     page_number= request.GET.get('page')
#     page_obj= Paginator.get_page('page_number')
#     context={"page_obj":page_obj}
#     return render(request,"index.html",context)


# from django.shortcuts import render
# from .models import Song
# from django.core.paginator import Paginator
#
# def index(request):
#     paginator = Paginator(Song.objects.all().order_by('id'), 1)
#     page_number = request.GET.get('page')
#     page_obj = paginator.get_page(page_number)
#     context = {"page_obj": page_obj}
#     return render(request, "main.html", context)



from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Song


def index(request):

    songs = Song.objects.all().order_by('id')

    paginator = Paginator(songs, 1)

    page_number = request.GET.get('page', 1)

    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
    }

    return render(request, 'main.html', context)
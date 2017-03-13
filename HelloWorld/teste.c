#include <stdio.h>
#include <stdlib.h>

typdef struct Edge {
 Vertex *v;
 Face *f;
 Edge *prev, *next;
 Edge *sym;
 
}Edge;
typedef struct Vertex 
{ Edge *e;

}Vertex;
typedef struct Face{
    Edge *e;
}Face;

int main()
{
    return 0;
    
}